export const cls = input =>
    input
        .replace(/\s+/gm, " ")
        .split(" ")
        .filter(cond => typeof cond === "string")
        .join(" ")
        .trim();

export const truncateDescriptions = (description, limit = 100) => {
    if (description.length <= limit) {
        return description;
    } else {
        return description.substring(0, limit) + "...";
    }
};

export const formatDate = created => {
    const createdDate = new Date(created);
    return new Intl.DateTimeFormat("pl-Pl").format(createdDate);
};
