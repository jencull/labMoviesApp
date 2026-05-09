const getAuthHeader = (body: string = "") => {
    const token = localStorage.getItem("token");
    const contentLength = new TextEncoder().encode(body).length;
    return {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Content-Length": String(contentLength),
    };
};

export const addReview = (movieId: number, review: object) => {
    const body = JSON.stringify({ movieId, ...review });
    return fetch(
        `${import.meta.env.VITE_APP_API}/reviews`,
        {
            method: "POST",
            headers: getAuthHeader(body),
            body,
        }
    ).then(res => res.json());
};

export const getMovieReviewsFromAPI = (movieId: number) => {
    return fetch(
        `${import.meta.env.VITE_APP_API}/reviews/${movieId}`,
        {
            method: "GET",
            headers: getAuthHeader(),
        }
    ).then(res => res.json());
};

export const updateReview = (reviewId: string, review: object) => {
    const body = JSON.stringify(review);
    return fetch(
        `${import.meta.env.VITE_APP_API}/reviews/${reviewId}`,
        {
            method: "PUT",
            headers: getAuthHeader(body),
            body,
        }
    ).then(res => res.json());
};
