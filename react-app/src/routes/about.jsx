export default function About() {
    return (
        <div>
            <h2>About</h2>

            <h3>1. First Things First</h3>
            <p>
                I wanted to establish the routes that I needed: Home, Tasklist and About page.
                This gave me something to navigate through, which meant I needed some sort of UI.
                I selected color scheme and laid out some simple CSS for layout and typography.
            </p>
            <p>
                I didn't want to get too far ahead myself and then have to remember what each thing I did was, so I started to add my notes to the about page.
                After that I tested and refined the site's UI.
            </p>

            <h3>2. Core Functionality</h3>
            <p>
                I started with the styling for the task creation form and the task list.
                This included hover, completion and undo states.
                With this in place I could focus on just the functional pieces.
            </p>
            <p>
                Next was storing and displaying tasks
                I had a script setup with localforage that was prime to repurpose for this application.
                I renamed the functions and added some dummy data to make sure <em>READ</em> capabilities worked as expected.
            </p>
            <p>
                Creation of a task was the next logical step.
                I started with sending dummy data to <code>createTask()</code>.
                Then I built out a <code>&lt;Form /&gt;</code> action to handle the input.
            </p>
            <p>
                Create, read, and now <em>update</em>.
                For this I used the same action as creating a task, so I had to add a conditional to differentiate between creation and updating.
            </p>
            <h3>3. CSS Transitions</h3>
            <p>
                The react routing didn't provide an obvious or intuitive way to introduce transitions to elements when their state changes.
                I ended up relying on a <code>setTimeout</code> in an awaited function to delay a form post, and animating tasks during that window.
            </p>
            <p>
                The CSS and markup gets a little crazy here.  There are two elements, the button that posts the data, and a look-alike <code>&lt;div&gt;</code> that contains the transition state.
                By using the look-alike, it was easier to control the animation state with CSS classes and embed an SVG into the page.
            </p>
            <h3>4. Completed Tasks</h3>
            <p>This was a fairly dry copy and paste job of the tasks page.
                The tasks elements between the two pages look nearly identical thanks to shared CSS.
                The markup itself is different enough that I didn't try to create a task component
                , though this was partly to limit ths cope of this exercise.
            </p>
            <p>
                I could have added filters on the tasks page, and there was a temptation to use CSS to control what is visible.
                I figured that wouldn't show off that ES6 <code>filter</code> method, so I refrained from doing that.
            </p>
            <h3>5. Closing Remarks</h3>
            <p>
                I tried to limit my time on this exercise, so there isn't much in the way of individual components, scoped CSS, page titles (thus Vite + React) or a change to the favicon.
                I also didn't add any form validation, or stop the user from entering duplicate task names.
            </p>
            <p>
                If you need to reset the data storage, it's under "Indexed DB" &gt; localforage, at least for me in Firefox.
            </p>
        </div>
    );
}