import React from "react";

function FormFields({ register, errors, setValue, existingImages }) {

    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setValue("image", Array.from(files));
        } else {
            setValue("image", []);
        }
    };


    return (
        <>
            <div className="row mb-3">
                <label htmlFor="title" className="col-sm-2 col-form-label">
                    Title
                    <span className="text-danger w-bold">*</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register("title")}
                />
                {errors.title && <p className="error">{errors.title.message}</p>}
            </div>

            <div className="row mb-3">
                <label htmlFor="description" className="col-sm-3 col-form-label">
                    Description
                    <span className="text-danger w-bold">*</span>
                </label>
                <textarea
                    className="form-control"
                    id="description"
                    {...register("description")}
                ></textarea>
                {errors.description && <p className="error">{errors.description.message}</p>}
            </div>

            <div className="row mb-3">
                <label htmlFor="image" className="col-sm-2 col-form-label">
                    Images
                    <span className="text-danger w-bold">*</span>
                </label>
                <input
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={handleImageChange}
                    multiple
                />
                {errors.image && <p className="error">{errors.image.message}</p>}
            </div>

            {/* Display Existing Images */}
            <div className="row mb-3">
                <div className="col-sm-10">
                    {existingImages && existingImages.length > 0 ? (
                        existingImages.map((image, index) => (
                            <img
                                key={index}
                                src={`${process.env.REACT_APP_BASE_URL}/images/uploads/${image}`}
                                alt={`Existing Image ${index + 1}`}
                                style={{ width: "100px", marginRight: "10px" }}
                            />
                        ))
                    ) : (
                        <p>No existing images.</p>
                    )}
                </div>
            </div>
            {/* End Display Existing Images */}

            <button type="submit" className="btn btn-primary">
                Save
            </button>
        </>
    );
}

export default FormFields;