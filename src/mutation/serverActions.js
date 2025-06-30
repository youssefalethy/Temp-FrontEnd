"use server";

export const loginAction = async (value) => {
    const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify(value),
    });
    if (res?.ok) {
        return await res?.json();
    } else {
        return false
    }
}