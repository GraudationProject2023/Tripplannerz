export const TripCategoryCascaderOption = (mainCategories, minorCategories, subCategories) => {
    return mainCategories.map((category) => ({
        value: category,
        label: category,
        children: buildMinorCategory(minorCategories[category], subCategories)
    }));
}

const buildMinorCategory = (minorCategories, subCategories) => {
    return minorCategories.map((category) => ({
        value: category,
        label: category,
        children: buildSubCategory(subCategories[category])
    }));
}

const buildSubCategory = (subCategories) => {
    return subCategories?.map((category) => ({
        value: category,
        label: category
    })) || [];
}
