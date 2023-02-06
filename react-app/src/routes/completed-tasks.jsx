import { useLoaderData } from "react-router-dom";
import { getTasks } from "../tasks";

export async function loader() {
    const tasks = await getTasks({completed: true});
    if (!tasks) {
        return [];
    }
    return tasks;
}

export default function CompletedTasks() {

    const tasks = useLoaderData();

    return (
        <div>
            <h2>Completed Tasks</h2>

            <div className="tasks">
                {typeof tasks !== "undefined" && tasks.length ? (
                    <>
                        {tasks.map((task) => (
                            <div key={task.id} className={task.complete ? "task static-task complete" : "task static-task"}>
                                {task.name}
                            </div>
                        ))}
                    </>
                ) : (
                    <p>
                        <i>No completed tasks yet, let's get to it!</i>
                    </p>
                )}
            </div>
        </div>
    );
}