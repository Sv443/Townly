const v8 = require("v8");
const mapRange = require("../mapRange");

function usedHeap()
{
	const heapStat = v8.getHeapStatistics();

	const max = heapStat.heap_size_limit;
	const val = heapStat.used_heap_size;

	return mapRange(val, 0, max, 0, 100);
}

module.exports = usedHeap;
