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
    // Backend expects movieID (uppercase), date, and text.
    // one of the errors that contributed to storing reviews not working
    const body = JSON.stringify({
        movieID: movieId,
        date: new Date().toISOString().split("T")[0],
        text: (review as any).content,
    });
    return fetch(
        `${import.meta.env.VITE_APP_API}/movies/reviews`,
        {
            method: "POST",
            headers: getAuthHeader(body),
            body,
        }
    ).then(res => res.json());
};

export const getMovieReviewsFromAPI = (movieId: number) => {
    return fetch(
        `${import.meta.env.VITE_APP_API}/movies/${movieId}/reviews`,
        {
            method: "GET",
            headers: getAuthHeader(),
        }
    ).then(res => res.json());
};

export const updateReview = (movieId: string, review: object) => {
    const body = JSON.stringify(review);
    return fetch(
        `${import.meta.env.VITE_APP_API}/movies/${movieId}/reviews`,
        {
            method: "PUT",
            headers: getAuthHeader(body),
            body,
        }
    ).then(res => res.json());
};
