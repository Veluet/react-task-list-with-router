import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getTasks, createTask, toggleTask } from "../tasks";
import { useEffect } from "react";

export async function loader() {
    const tasks = await getTasks();
    if (!tasks) {
        return [];
    }
    return tasks;
}

export async function action({ request, params }) {
    let formData = await request.formData();

    if (formData.get("id")) {

        // When the form posts it reloads the data and we lose our chance to animate the toggle,
        // This adds a delay to the request.
        await new Promise(r => setTimeout(r, 1000));

        return toggleTask(formData.get("id"));
    }

    if (formData.get("name")) {
        const task = {
            name: formData.get("name"),
        }
        return createTask(task);
    }

    return false;
}

function handleTaskTransition(event) {
    event.target.classList.add("transition");
}

export default function Tasks() {

    const tasks = useLoaderData();

    return (
        <div>
            <h2>Tasks</h2>
            <Form method="post">
                <div className="create-task">
                    <label>Create a Task:</label>
                    <input type="text" placeholder="Task Name" className="task-width" maxLength={60} name="name" required />
                    <button type="submit"><span className="button-text">Create</span></button>

                </div>
            </Form>
            <div className="all-tasks">
                <h3>Your Tasks</h3>
                <div className="tasks">
                    {typeof tasks !== "undefined" && tasks.length ? (
                        <>
                            {tasks.map((task) => (
                                <Task task={task} key={task.id} />
                            ))}
                        </>
                    ) : (
                        <p>
                            <i>No tasks</i>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

function Task({ task }) {
    const fetcher = useFetcher();

    let complete = task.complete;

    if (fetcher.formData) {
        complete = fetcher.formData.get("complete") === "true";
    }
    return (
        <fetcher.Form method="post" id="toggleTask" name="toggleTask" className="task-item">
            <button
                name="id"
                className={task.complete ? "task complete" : "task"}
                value={task.id}
                onClick={handleTaskTransition}
            >
                {task.name}
            </button>
            <div className={task.complete ? "task complete task-transition" : "task task-transition"}>
                <span className="transition-svg"><TransitionSVG /></span>
                <span>{task.name}</span>
            </div>
        </fetcher.Form>
    );
}

function TransitionSVG() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="20" height="20" version="1.0" viewBox="0 0 128 128">
            <g>
                <path fill="#17ceae" d="M56 0h16l-5 32h-6z" />
                <path fill="#b9f0e7" d="m89 4.6 13.9 8-20.4 25.2-5.2-3zM115.3 25l8 13.9-30.2 11.6-3-5.2zm12.6 30.9v16l-32-5v-6zm-4.6 33-8 13.8-25.2-20.3 3-5.2zm-20.4 26.3-13.9 8L77.4 93l5.2-3z" />
                <path fill="#a2ebdf" d="M72 127.8H56l5-32h6z" />
                <path fill="#8be6d6" d="m39 123.2-13.9-8L45.5 90l5.2 3z" />
                <path fill="#74e2ce" d="M12.7 102.7 4.7 89l30.2-11.7 3 5.2z" />
                <path fill="#5cddc6" d="M.1 71.9v-16l32 5v6z" />
                <path fill="#45d8be" d="m4.7 38.9 8-13.9 25.2 20.4-3 5.2z" />
                <path fill="#2ed3b6" d="m25.1 12.6 13.9-8 11.6 30.2-5.2 3z" />
                <animateTransform attributeName="transform" calcMode="discrete" dur="1080ms" repeatCount="indefinite" type="rotate" values="0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64" />
            </g>
        </svg>
    );
}