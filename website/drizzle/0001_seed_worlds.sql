-- Organizer-owned starter worlds. Files ship with the Worker; contestant uploads use R2.
INSERT OR IGNORE INTO submissions (id,team,title,world,entry_path,description,exit_hook,byte_size,file_count,has_relay,status,review_note,created_at) VALUES ('example-wasteland','主办方示例队','余烬之约','废土集市','wasteland-market/index.html','在锈风集市拾荒、以物易物、修好电台。你留下的净水，会成为别人的明天。','电台忽然传出一段戏腔，三声锣响压过集市的风。信号提灯泛起青光，照出一道朱门。你推门而入，红灯笼下坐满了没有影子的看客——幽冥戏班，今夜等你替班。','44344','6','1','approved','主办方已验证的接力示例。','2026-10-27T12:00:00.000Z');
--> statement-breakpoint
INSERT OR IGNORE INTO submissions (id,team,title,world,entry_path,description,exit_hook,byte_size,file_count,has_relay,status,review_note,created_at) VALUES ('example-opera','主办方示例队','子夜折子','幽冥戏班','ghost-opera/index.html','循戏本、正脸谱、鸣送魂。唱完一折给亡者的戏，才有你自己的归途。','最后一声锣落下，戏魂各自归去。你提着青灯穿过幕后之门，终于走回主神大厅，带着这一路的遗物和故事。','47239','6','1','approved','主办方已验证的接力示例。','2026-10-27T12:00:00.000Z');
--> statement-breakpoint
INSERT OR IGNORE INTO routes(id,title,stages,created_at) VALUES ('initial-worldline','初始世界线 · 余烬与归客','[{"id":"example-wasteland","title":"余烬之约","world":"废土集市","team":"主办方示例队","entry_path":"wasteland-market/index.html","exitHook":"电台忽然传出一段戏腔，三声锣响压过集市的风。信号提灯泛起青光，照出一道朱门。你推门而入，红灯笼下坐满了没有影子的看客——幽冥戏班，今夜等你替班。"},{"id":"example-opera","title":"子夜折子","world":"幽冥戏班","team":"主办方示例队","entry_path":"ghost-opera/index.html","exitHook":"最后一声锣落下，戏魂各自归去。你提着青灯穿过幕后之门，终于走回主神大厅，带着这一路的遗物和故事。"}]','2026-10-27T12:00:00.000Z');
--> statement-breakpoint
INSERT OR IGNORE INTO settings(key,value) VALUES ('active_route','initial-worldline');
