# TODO App with Redux and Web Workers

This is some code I'm just toying with to get an idea on how I would structure
a web app where the main thread is used just for UI and the web worker would be
going the heavy lifting.

I don't expect this project to be faster than a simple app - quite the opposite
actually. But I am curious if this is viable for larger apps where there is a
bit more processing in the Worker or for devices that do not have a lot of
processing power and we want to keep the main thread super fast for responsive
UIs.

This architecture is different from say moving JUST a complex component into
a Web Worker and using something like
[`redux-worker`](https://github.com/chikeichan/redux-worker) to manage that
process.

## Ideas

The basic idea I have right now for the app looks like the Redux pattern.

- The main thread has access to the current _state_, which is immutable.
- The main thread dispatches _actions_ to the Web Worker.
- The Worker _reduces_ the action and state to cerate a new state.
- The Worker tells the main thread what the new state is.
- The main thread updates the UI based on the state change.

### Still Vague Ideas

#### Do I use Redux just in the Web Worker?

The Web Worker is the thing that is really managing the state. The Worker could
just send over copies of the state to the main thread and the main thread would
not have to be the wiser about Redux.

I am curious what that would mean for debug tools. Plus, would I be sending over
more state then the main thread may actually need - thus slowing down the
`postMessage` communications.

#### Do I use Redux just in the Main Thread?

This would be more traditional. The Worker would be treated like some Async
service. [`redux-thunk`](https://github.com/reduxjs/redux-thunk) or
[`redux-observable`](https://redux-observable.js.org/) could be used to
initiate the calls.

For the Web Worker, each `postMessage` would have some name of the main
reducer it is supposed to run and the main thread would just know to delegate
the heavy lifting to that Worker. `redux-worker` conceptually starts to feel
like a good fit here perhaps.

The nice part about this is the main thread gets to decide what state it is in
while it waits for the answer from the Worker. And the dev tools would just
work.

#### Do I use a Redux store in the Main Thread and Worker?

So we could have a store in the main thread and worker. The store for the main
thread would be very specific for UI, and look a lot like the store in the
option above. For the Worker, the state would represent all of everything the
client knows at a given time.

I am curious what this would mean for the dev tools as well.
