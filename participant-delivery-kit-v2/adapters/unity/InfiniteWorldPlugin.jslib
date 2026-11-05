mergeInto(LibraryManager.library, {
  IW_SendReady: function () {
    if (window.__iwUnityListener) return;
    window.__iwUnityListener = true;
    window.addEventListener('message', function (e) {
      if (e.source === window.parent && e.data && e.data.save && (e.data.type === 'IW_INIT_SAVE' || e.data.type === 'iw-init')) {
        SendMessage('InfiniteWorldBridge', 'OnSaveReceived', JSON.stringify(e.data.save));
      }
    });
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'IW_READY' }, '*');
    } else if (window.WL) {
      SendMessage('InfiniteWorldBridge', 'OnSaveReceived', JSON.stringify(window.WL.readSave()));
    }
  },
  IW_CompleteLevel: function (saveJsonPtr) {
    var save = JSON.parse(UTF8ToString(saveJsonPtr));
    if (window.WL && window.WL.completeLevel) {
      window.WL.completeLevel(window.CONFIG || {}, save, {
        exitHook: save.exit_hook,
        nextUrl: (window.CONFIG || {}).nextUrl || window.location.href
      });
    } else if (window.parent !== window) {
      window.parent.postMessage({ type: 'IW_SAVE', save: save }, '*');
    }
  },
  IW_FailLevel: function (reasonPtr, saveJsonPtr) {
    var reason = UTF8ToString(reasonPtr);
    var save = JSON.parse(UTF8ToString(saveJsonPtr));
    if (window.WL && window.WL.failLevel) {
      window.WL.failLevel(reason, save, window.CONFIG || {});
    } else if (window.parent !== window) {
      window.parent.postMessage({ type: 'IW_FAIL', reason: reason, fallenSave: save }, '*');
    }
  }
});
