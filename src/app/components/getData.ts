export async function getPage(props: { page: string }) {
    const res = await fetch(
        `https://notion-api.splitbee.io/v1/page/${props.page}`,
        { next: { revalidate: 3600 } }
    )
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getDatabase(props: { page: string }) {
    const res = await fetch(
        `https://notion-api.splitbee.io/v1/table/${props.page}`,
        { next: { revalidate: 3600 } }
    )
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // console.log(res.json())

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}