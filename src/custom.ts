function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// eslint-disable-next-line @typescript-eslint/ban-types
async function waitUntilTrue<T extends {} | null>(
  waitUntilTrueCallback: () => T | undefined,
  period: number,
  cycle: number,
  timeoutErrorCallback?: () => unknown,
  successCallback?: () => unknown
) {
  do {
    const value = waitUntilTrueCallback();
    if (value !== undefined) {
      successCallback?.();
      return value;
    }
    await delay(period);
  } while (cycle-- > 0);
  timeoutErrorCallback?.();
  return;
}

let debugToolBarObserver: MutationObserver | undefined;

function disconnect() {
  if (debugToolBarObserver !== undefined) {
    debugToolBarObserver.disconnect();
    console.log(`debugToolBarObserver disconnected`);
    debugToolBarObserver = undefined;
  }
}

function getOutOfMyWay(debugToolbar: HTMLDivElement) {
  console.log('patch debug toolbar now');
  debugToolbar.setAttribute(
    'style',
    `
      bottom: 0;
      top: unset;
      left: 4px;
      position: fixed;
      height: 32px;
      display: flex;
      padding-left: 7px;
      box-shadow: none;
      transform: rotate(-90deg) translate(90px, 20px);
      transform-origin: left center 0px;
  `.replace(/\n|\s{2,}/g, '')
  );
}

disconnect();
const observerGen = (debugToolbar: HTMLDivElement) =>
  new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes') {
        switch (mutation.attributeName) {
          case 'style': {
            const div = mutation.target as HTMLDivElement;
            const top = div.style.top;
            if (top !== 'unset' && typeof top === 'string') {
              console.log(`debug tool bar attribute top:${top} changed`);
              getOutOfMyWay(debugToolbar);
            }
            break;
          }
          default: {
            break;
          }
        }
      }
    }
  });

let count = 0;
void waitUntilTrue(
  () => {
    const debugToolbar =
      document.querySelector<HTMLDivElement>('.debug-toolbar');
    if (count++ % 4 === 0) {
      console.log('wait for debug toolbar enable');
    }
    return debugToolbar === null ? undefined : debugToolbar;
  },
  500,
  Number.POSITIVE_INFINITY
  // eslint-disable-next-line unicorn/prefer-top-level-await
).then((debugToolbar) => {
  if (debugToolbar === undefined) {
    return;
  }

  getOutOfMyWay(debugToolbar);
  debugToolBarObserver = observerGen(debugToolbar);
  debugToolBarObserver.observe(debugToolbar, {
    attributes: true,
  });
});
