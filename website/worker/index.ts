import {routeById} from '../lib/portal';
import handler from "vinext/server/fetch-handler";
import { runWithConnectorBinding } from "../lib/connector-context";
import type { ConnectorBinding } from "../lib/connector-contract.mjs";

const worker = {
  async fetch(request: Request, env: Cloudflare.Env, ctx: ExecutionContext<{ CONNECTORS?: ConnectorBinding }>) {
    const path=new URL(request.url).pathname;
    if(request.method==='GET'&&path.startsWith('/run/')){
      try{
        const id=decodeURIComponent(path.split('/')[2]||'');
        const route=await routeById(env,id);
        if(!route.stages.length)return new Response('世界线还没有可游玩的关卡，请返回赛事大厅。',{status:409,headers:{'Content-Type':'text/plain; charset=utf-8'}});
        if(id==='infinite-world')return Response.redirect(new URL('/run/'+route.id,request.url).href,302);
      }catch(error){
        return new Response(error instanceof Error?error.message:'旅程加载失败。',{status:(error as any).status||500,headers:{'Content-Type':'text/plain; charset=utf-8'}});
      }
    }
    let binding = ctx.props?.CONNECTORS;
    // Local preview emulates the same request-scoped capability. This branch and
    // the auxiliary service binding are absent from production builds.
    if (import.meta.env.DEV && !binding && env.CONNECTORS) {
      const preview = env.CONNECTORS;
      const expiresAt = Date.now() + 60_000;
      binding = {
        async getContext() {
          if (Date.now() >= expiresAt) return { status: "request_context_expired" };
          return preview.getContext?.() ?? { status: "binding_unavailable" };
        },
        async invoke(connectorId, actionName, args) {
          if (Date.now() >= expiresAt) {
            return { status: "request_context_expired", message: "This request has expired. Please try again." };
          }
          return preview.invoke(connectorId, actionName, args);
        },
      };
    }
    return runWithConnectorBinding(binding, () => handler.fetch(request, env, ctx));
  },
};

export default worker;

