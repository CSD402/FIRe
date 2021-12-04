const capitalizeFirstLetter = (string: String) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const sluggify = (string: String, length: number = 15) => {
    return string ? string.substring(0, length) : string;
};

export { capitalizeFirstLetter, sluggify };
