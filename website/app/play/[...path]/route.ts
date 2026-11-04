import {env} from 'cloudflare:workers';
import {handleGame} from '@/lib/portal';
export const dynamic='force-dynamic';
export const GET=(request:Request)=>handleGame(request,env);
