const counts=[]

export default function countReducer(preState=counts,action){
    switch (action.type) {
        case 'init':
            return new Array(action.date).fill(0)
        case 'update':
        {
            const newCounts = [...preState];
            newCounts[action.data] = newCounts[action.data] + 1;
            return newCounts;
        }
        default:
            return new Array(action.date).fill(0)
    }
}