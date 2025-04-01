const Url = "https://playground.4geeks.com/contact/agendas"


export const ApiContacList = {
    createAgenda: async (user) => {
        try {
            const request = await fetch(`${Url}/${user}`, {
                method: "POST"
            })
            const response = await request.json();
            return response
        } catch (error) {
            console.log(error)
            return error
        }
    },
    checkgenda: async (user) => {
        try {
            const request = await fetch(`${Url}/${user}/contacts`, {
                method: "GET"
            })
            const response = await request.json();
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
            return error

        }
    },
    deleteAgenda: async (user) => {
        try {
            const request = await fetch(`${Url}/${user}`, {
                method: "DELETE"
            })
            const response = await request.json();
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
            return error

        }
    },
    creaContact: async (user, name, phone, email, address) => {
        let task = {
            "name": `${name}`,
            "phone": `${phone}`,
            "email": `${email}`,
            "address": `${address}`
        };
        try {
            const request = await fetch(`${Url}/${user}/contacts`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(task)
            })
            const response = await request.json();
            return response
        } catch (error) {
            console.log(error)
            return error

        }
    },
    deleteContact: async (user, id) => {
        try {
            const request = await fetch(`${Url}/${user}/contacts/${id}`, {
                method: "DELETE",
            })
            const response = await request.json();
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
            return error

        }
    },
    updateContact: async (user, name, phone, email, address, id) => {
        let task = {
            "name": `${name}`,
            "phone": `${phone}`,
            "email": `${email}`,
            "address": `${address}`
        };
        try {
            const request = await fetch(`${Url}/${user}/contacts/${id}`, {
                method: "PUT",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(task)
            })
            const response = await request.json();
            return response
        } catch (error) {
            console.log(error)
            return error
        }
    }
}