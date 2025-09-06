export default function bs_list(haystack: number[], needle: number): boolean {
    // console.log("----hay----", haystack, "and size is ---", haystack.length);
    let low = 0;
    let high = haystack.length; // which is 8

    while (low < high) {
        let midpoint = Math.floor(low + (high - low) / 2);
        let value = haystack[midpoint];
        // console.log("midpoint m---", midpoint);
        // console.log("value---", value);

        if (value === needle) return true;
        else if (value < needle) {
            low = midpoint + 1; // low is inclusive.
        } else if (value > needle) {
            high = midpoint; // high is exclusive
        }
    }

    return false;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8];

// const result1 = bs_list(arr, 6);
// console.log("result1", result1);

// const result2 = bs_list(arr, 10);
// console.log("result2", result2)
