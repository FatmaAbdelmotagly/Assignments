var longestCommonPrefix = function(strs) {
    let pre = "";
    let shortestWord = 10000;

    for (let i = 0; i < strs.length; i++) {
        if (strs[i].length < shortestWord) {
            shortestWord = strs[i].length;
        }
    }
    for (let i = 0; i < shortestWord; i++) {
        const firstChar = strs[0][i];
        const different = strs.find(ele => ele[i] != firstChar);

        if (different) {
            return pre;
        }
        pre += firstChar;
    }
    return pre;
};

console.log(longestCommonPrefix( ["flower","flow","flight"]));


