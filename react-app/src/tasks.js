import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getTasks(params) {
    let tasks = await localforage.getItem("tasks");
    if (!tasks) tasks = [];
    let result = tasks.sort(sortBy("createdAt"));
    if (typeof params !== "undefined") {
        result = result.filter(task => task.complete === params.completed);
    }
    console.log(result);
    return result;
}

export async function createTask(data) {

    if (typeof data.name === "undefined" || data.name === "" || data.name === null) {
        return false;
    }

    console.log("CREATETASK()", data, "name", data.name)

    let id = Math.random().toString(36).substring(2, 9);
    let task = { id, createdAt: Date.now(), name: data.name, complete: false };
    let tasks = await getTasks();
    tasks.unshift(task);
    await set(tasks);
    return task;
}

export async function getTask(id) {
    let tasks = await localforage.getItem("tasks");
    let task = tasks.find(task => task.id === id);
    return task ?? null;
}

export async function toggleTask(id) {
    let tasks = await localforage.getItem("tasks");
    let task = tasks.find(task => task.id === id);


    if (!task) throw new Error("No task found for", id);
    Object.assign(task, {task, complete: !task.complete});
    await set(tasks);
    return task;
}

export async function updateTask(id, updates) {
    let tasks = await localforage.getItem("tasks");
    let task = tasks.find(task => task.id === id);
    if (!task) throw new Error("No task found for", id);
    Object.assign(task, updates);
    await set(tasks);
    return task;
}

export async function deleteTask(id) {
    let tasks = await localforage.getItem("tasks");
    let index = tasks.findIndex(task => task.id === id);
    if (index > -1) {
        tasks.splice(index, 1);
        await set(tasks);
        return true;
    }
    return false;
}

function set(tasks) {
    return localforage.setItem("tasks", tasks);
}