export function removeHidden(collection: any[]){
    return collection.filter((item: any) => {
        if (!item.hide) return true
        return false
    })
}