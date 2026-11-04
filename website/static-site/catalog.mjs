const team = '主办方示例队';
const examples = [
  ['example-wasteland', 'wasteland-market', '废土集市', '余烬之约',
    '在锈风集市拾荒、以物易物、修好电台。你留下的净水，会成为别人的明天。'],
  ['example-opera', 'ghost-opera', '幽冥戏班', '子夜折子',
    '循戏本、正脸谱、鸣送魂。唱完一折给亡者的戏，才有你自己的归途。'],
];
export const games = examples.map(([id, folder, world, title, description]) => ({
  id, team, world, title, description, entry: folder + '/index.html',
  exitHook: '', status: 'approved', fileCount: 6, hasRelay: true,
}));
export const route = {
  id: 'infinite-world', title: '无限世界',
  stages: games.map(game => ({...game, entry_path: game.entry})),
};
export async function staticRequest(path) {
  if (path === 'state') {
    return {games, routes: [route], activeRoute: route.id, admin: false, groups: []};
  }
  if (path === 'routes/' + route.id) return route;
  const game = games.find(game => path === 'demo/' + game.id);
  if (game) return {url: './games/demo/' + game.id + '/' + game.entry};
  throw new Error('静态版仅提供作品浏览与游玩。');
}
