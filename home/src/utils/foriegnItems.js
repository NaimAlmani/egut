const foriegnItems = (allItems, currentItems) => {
	const result = allItems.filter((x) => {
		return currentItems.filter((c) => c.id === x.id).length <= 0;
	});
	return result;
};
export default foriegnItems;
