import isEmpty from './../validation/is-empty';
const filterActivities = (allActivities, categories, groups, days) => {
	let resultCat = [];
	let resultGroup = [];
	// 1 filtered categories
	if (!isEmpty(categories)) {
		resultCat = allActivities.filter((act) => {
			return (
				act.categories.filter((cat1) => {
					return (
						categories.filter((cat2) => {
							return cat1.id === cat2.id;
						}).length > 0
					);
				}).length > 0
			);
		});
	} else {
		resultCat = allActivities;
	}

	if (!isEmpty(groups)) {
		resultGroup = allActivities.filter((act) => {
			return (
				act.groups.filter((group1) => {
					return (
						groups.filter((group2) => {
							return group1.id === group2.id;
						}).length > 0
					);
				}).length > 0
			);
		});
	} else {
		resultGroup = allActivities;
	}
	//get full info
	const finalresult = allActivities.filter((act) => {
		return (
			resultCat.filter((c) => c.id === act.id).length > 0 && resultGroup.filter((c) => c.id === act.id).length > 0
		);
	});
	return finalresult;
};
export default filterActivities;
