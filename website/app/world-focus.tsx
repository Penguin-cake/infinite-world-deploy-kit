'use client';
import './world-focus.css';
const names=['停摆医院','永夜列车','迷雾小镇','深海囚笼','废土集市','幽冥戏班','像素王城','无重力空间站','极夜科考站','镜像图书馆','快递末世','糖果工厂','高考修罗场','剧本杀片场','上古遗迹','天台便利店','霓虹黑客都市','暴雪山庄','空中飞艇港','地下酒馆赌局','熔岩地心城','黑死病小镇','武侠客栈','未来法庭','午夜广播电台','巨型温室','环形监狱塔','沙漠商队绿洲','永昼小镇','深渊灯塔','折纸世界','巨人国边境'];

export function WorldFocus({world}:{world:string|null}){if(!world)return null;const n=Math.max(0,names.indexOf(world));return <div className="world-focus" aria-hidden="true"><div key={world} className="focus-camera" style={{backgroundPosition:((n%8)/7*100)+'% '+(Math.floor(n/8)/3*100)+'%'}}/><div className="focus-halo"/><div className="focus-world" key={'name-'+world}><small>WORLD {String(n+1).padStart(2,'0')} / 32</small><strong>{world}</strong></div></div>}
