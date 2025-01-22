import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().email().required('Email is required.'),
    password: yup.string().required('Password is required.').min(6).max(32),
});

export const registerSchema = yup.object().shape({
    first_name: yup.string().required('First name is required.').trim(),
    last_name: yup.string().required('Last name is required.').trim(),
    email: yup.string().email().required('Email is required.').trim(),
    password: yup.string().required('Password is required.').min(6).max(32).trim(),
    mobile_number: yup.string().trim()
});

export const forgotPasswordSchema = yup.object().shape({
    email: yup.string().required('Email is required.').email().trim(),
});

export const resetPasswordSchema = yup.object().shape({
    password: yup.string().required('Password is required.').min(6).max(32).trim(),
});

export const updateProfileSchema = yup.object().shape({
    first_name: yup.string().required('First name is required.').trim(),
    last_name: yup.string().required('Last name is required.').trim(),
    mobile_number: yup.string().trim()
});

export const changePasswordSchema = yup.object().shape({
    oldPassword: yup.string().required('Old password is required.').min(6, 'Old password must be at least 6 characters').max(32).trim(),
    newPassword: yup.string().required('New password is required.').min(8, 'Old password must be at least 8 characters').max(32).trim(),
});

export const postSchema = yup.object().shape({
    title: yup.string().required("Title is required").trim(),
    description: yup.string().required("Description is required").trim(),
    // image: yup.string().required("Image is required"),
    image: yup
        .mixed()
        // .test(
        //     "fileList-not-empty",
        //     "At least one image is required",
        //     (value) => value && value.length > 0
        // )
        .required("Image is required"),
});
