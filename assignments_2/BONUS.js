
var findKthPositive = function(arr, k) {
    let missing =[];
    for(let i = 1 ; i<=arr[arr.length-1]+k;i++){
        if(arr.includes(i))
            continue
        else{
            missing.push(i)
        }
    }
    return missing[k-1]
};
console.log( findKthPositive([2,3,4,7,11],5));
