import Phaser from 'phaser';

export class InfiniteWorldPlugin extends Phaser.Plugins.BasePlugin {
  public save: any = null;
  private onMessage = (event: MessageEvent) => {
    const data = event.data;
    if (event.source === window.parent && data?.save && (data.type === 'IW_INIT_SAVE' || data.type === 'iw-init')) {
      this.save = data.save;
      this.game.events.emit('save-ready', this.save, data.history || [], data.config || {});
    }
  };

  init() {
    window.addEventListener('message', this.onMessage);
    if ((window as any).WL) {
      this.save = (window as any).WL.readSave();
      this.game.events.emit('save-ready', this.save, (window as any).WL.readHistory(), {});
    } else if (window.parent !== window) {
      window.parent.postMessage({ type: 'IW_READY' }, '*');
    }
  }

  destroy() {
    window.removeEventListener('message', this.onMessage);
    super.destroy();
  }

  consumeItem(type: string): any | null {
    if (!this.save?.items) return null;
    const index = this.save.items.findIndex((item: any) => item.type === type);
    return index === -1 ? null : this.save.items.splice(index, 1)[0];
  }

  completeLevel(exitHook: string, items: any[], clues: string[]) {
    if (!this.save) throw new Error('尚未收到宿主存档');
    const nextSave = { ...this.save, exit_hook: exitHook, items, clues };
    if ((window as any).WL?.completeLevel) {
      (window as any).WL.completeLevel((window as any).CONFIG || {}, nextSave, {
        exitHook,
        nextUrl: (window as any).CONFIG?.nextUrl || window.location.href
      });
    } else if (window.parent !== window) {
      window.parent.postMessage({ type: 'IW_SAVE', save: nextSave }, '*');
    }
  }

  failLevel(reason = '角色力竭') {
    if ((window as any).WL?.failLevel) {
      (window as any).WL.failLevel(reason, this.save, (window as any).CONFIG || {});
    } else if (window.parent !== window) {
      window.parent.postMessage({ type: 'IW_FAIL', reason, fallenSave: this.save }, '*');
    }
  }
}
