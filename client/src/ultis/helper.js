export const timeDiff = begin => {
    let startDate = new Date(begin);
    let currentDate = new Date();
    let timeDiff = Math.abs(currentDate.getTime() - startDate.getTime());
    if (timeDiff < 3600000) {
        let minutesDiff = Math.floor(timeDiff / (1000 * 60));
        return (minutesDiff + " phút trước");
    } else if (timeDiff < 86400000) {
        let hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
        return (hoursDiff + " giờ trước");
    } else if (timeDiff < 2592000000) {
        let daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        return (daysDiff + " ngày trước");
    } else if (timeDiff < 31536000000) {
        let monthsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
        return (monthsDiff + " tháng trước");
    } else {
        let yearsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
        return (yearsDiff + " năm trước");
    }
}

export const timeDiff2 = begin => {
    let startDate = new Date(begin);
    let currentDate = new Date();
    let timeDiff = Math.abs(currentDate.getTime() - startDate.getTime());
    if (timeDiff < 3600000) {
        let minutesDiff = Math.floor(timeDiff / (1000 * 60));
        return (minutesDiff + " phút trước");
    } else if (timeDiff < 86400000) {
        let hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
        return (hoursDiff + " giờ trước");
    } else if (timeDiff < 604800000) {
        let daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        return (daysDiff + " ngày trước");
    } else {
        const year = startDate.getFullYear();
        const month = startDate.getMonth();
        const day = startDate.getDate();
        const formattedDateString = `${day} tháng ${month}, ${year}`;
        return (formattedDateString);
    }
}

export const checkIdInclude = (elements, userId) => {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i]._id == userId) return true;
    }
    return false;
}

export const removeItem = (elements, userId) => {
    return elements.map(item => {
        return item._id != userId;
    })
}

export const formatNum = (number) => {
    if (number < 1000) return number;
    if (number < 1000000) {
        const kNumber = (number/1000).toFixed(1);
        return kNumber.endsWith('.0') ? kNumber.slice(0, -2) + 'k' : kNumber + 'k';
    }
    else {
        const mNumber = (number/1000000).toFixed(1);
        return mNumber.endsWith('.0') ? mNumber.slice(0, -2) + 'M' : mNumber + 'm';
    }
}