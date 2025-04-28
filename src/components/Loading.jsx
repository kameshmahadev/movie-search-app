// src/components/Loading.jsx
import React from "react";

const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid border-4 border-t-transparent"></div>
        </div>
    );
};

export default Loading;
