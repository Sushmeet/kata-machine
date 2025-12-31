# Binary Search Explanation

This document explains the logic behind the binary search implementation in `BinarySearchList.ts`, focusing on boundary management and midpoint calculation.

## 1. Boundary Management: Inclusive vs. Exclusive

In this implementation, we use a **Half-Open Range**: `[low, high)`.

-   **`low` is Inclusive (`[`):** It represents the first index that _could_ contain the target value.
-   **`high` is Exclusive (`)`):** It represents the index _just beyond_ the last possible candidate.

### Update Logic:

-   **`low = midpoint + 1`**: When the value at `midpoint` is too small, we know `midpoint` is not the answer. Since `low` is inclusive, we move it to the very next possible candidate.
-   **`high = midpoint`**: When the value at `midpoint` is too large, we know `midpoint` is not the answer. Since `high` is exclusive, setting it to `midpoint` effectively removes `midpoint` (and everything after it) from the next search window.

---

## 2. Midpoint Calculation Logic

The code calculates the midpoint using:

```typescript
let midpoint = Math.floor(low + (high - low) / 2);
```

### Why not `(low + high) / 2`?

While `(low + high) / 2` is mathematically the same, it is prone to **Integer Overflow** in many programming languages (like C++, Java, or Rust).

1.  **The Problem**: If `low` and `high` are both very large numbers, their sum `low + high` might exceed the maximum value a 32-bit integer can hold (approx 2.1 billion). This would result in a negative number or an incorrect result.
2.  **The Solution**: `low + (high - low) / 2` avoids calculating the large sum. Instead, it calculates the _distance_ between the points (`high - low`), halves that distance, and adds it back to the starting point. This is guaranteed to stay within the bounds of the largest index.

### Why `Math.floor`?

In JavaScript/TypeScript, the division operator `/` returns a floating-point number (e.g., `5 / 2 = 2.5`). Since array indices must be integers, we use `Math.floor()` to round down to the nearest whole number.

### 2.1 Concrete Example Walkthrough

Let's look at an array of 8 numbers: `[10, 20, 30, 40, 50, 60, 70, 80]` Target (`needle`): **70**

**Step 1:**

-   `low = 0`, `high = 8`
-   `midpoint = Math.floor(0 + (8 - 0) / 2) = 4`
-   `haystack[4]` is **50**.
-   Since **50 < 70**, we update `low = 4 + 1 = 5`. (Search range is now `[5, 8)`)

**Step 2:**

-   `low = 5`, `high = 8`
-   `midpoint = Math.floor(5 + (8 - 5) / 2) = Math.floor(5 + 1.5) = 6`
-   `haystack[6]` is **70**.
-   **Found!** Returns `true`.

> [!NOTE] Notice in Step 2: `(high - low) / 2` gave us `1.5`. Adding that to `low` (5) gives `6.5`. `Math.floor(5 + 1.5)` rounds the result down to `6`, which is exactly where **70** is located.

---

## 3. Summary Table

| Operation | Logic | Purpose |
| :-- | :-- | :-- |
| **Initial `high`** | `haystack.length` | Points one past the last element (Exclusive). |
| **Loop Condition** | `low < high` | Loop as long as there is at least 1 element in the window. |
| **Move Right** | `low = midpoint + 1` | Exclude `midpoint` (too small) and move to next candidate. |
| **Move Left** | `high = midpoint` | Exclude `midpoint` (too big) by making it the exclusive end. |
| **Midpoint** | `low + (high - low) / 2` | Prevent overflow and find the safe center. |

---

## 4. Frequently Asked Questions

### Could we use `low + Math.floor((high - low) / 2)` instead?

**Yes.** In this specific algorithm, both result in the same index.

-   Since `low` is always an integer (it starts at 0 and is updated by `midpoint + 1`), adding an integer to the "floored" division gives the same result as flooring the entire sum.
-   **Example (`low=5`, `high=8`)**:
    -   `Math.floor(5 + 1.5) = 6`
    -   `5 + Math.floor(1.5) = 6`

### Would it work without `Math.floor` entirely?

**No.** This is a common pitfall in JavaScript/TypeScript.

-   Unlike Java or C++, JavaScript numbers are 64-bit floats by default. `5 / 2` is `2.5`.
-   If `midpoint` becomes `6.5`, `haystack[6.5]` will return `undefined`.
-   The comparisons (`value < needle`) would fail, and the loop would likely never find the target or get stuck.
