export function changeCategory(category: string | undefined) {
    return {
        type: 'changeCategory',
        payload: category,
    }
}

export function changePlatform(platform: string | undefined) {
    return {
        type: 'changePlatform',
        payload: platform,
    }
}

export function changeSortBy(sortBy: string | undefined) {
    return {
        type: 'changeSortBy',
        payload: sortBy,
    }
}