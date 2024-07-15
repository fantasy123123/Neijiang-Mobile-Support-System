import axiosInstance from "../../api/AxiosApi";

const countGroups=[]

export default function countReducer(preState=[],action){
    switch (action.type) {
        case 'init':{
            axiosInstance.get('/groups').then(
                res=>{
                    res.data.data.forEach((value)=>{
                        countGroups.push({
                            groupId:value.groupId,
                            counts:0
                        })
                    })
                }
            )
            break;
        }
        case 'toZero':
            countGroups.forEach(value => {
                if(value.groupId===action.groupId){
                    value.counts=0
                }
            })
            return countGroups
        case 'update':
        {
            countGroups.forEach(value => {
                if(value.groupId===action.groupId){
                    value.counts+=1
                }
            })
            return countGroups
        }
        case 'add':
        {
            countGroups.push({
                groupId:action.groupId,
                counts:0
            })
            break
        }
        case 'delete':
        {
            countGroups.forEach((value,index) => {
                if(value.groupId===action.groupId){
                    countGroups.splice(index,1)
                }
            })
            console.log(countGroups)
            break
        }
        case 'view':return countGroups
        default:return countGroups
    }
}