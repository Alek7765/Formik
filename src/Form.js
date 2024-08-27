import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

// const validate = values => { // если использовть валидацию без Yup
//     const errors = {};

//     if (!values.name) {
//         errors.name = 'Обязательное поле!';
//     } else if (values.name.length < 2) {
//         errors.name = 'Минимум 2 символа для заполения!'
//     }

//     if (!values.email) {
//         errors.email = 'Обязательное поле!';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//         errors.email = 'Неверно заполненный email'
//     }

//     return errors;
// }

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )
}

const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <>
            <label className='checkbox'>
                <input type='checkbox' {...props} {...field} />
                {children}
            </label>

            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )
}

const CustomForm = () => {

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                amount: 0, // сумма доната
                currency: '', // валюта
                text: '',
                terms: false // политика конденфициальности
            }}
            validationSchema={Yup.object({ // вернем объект
                name: Yup.string() // проверяем на строку
                    .min(2, 'Минимум 2 символа!') // условие по кол-ву символов
                    .required('Обязательное поле!'), // условие для пустого поля
                email: Yup.string()
                    .email('Неправельный email адрес') // проверяем что заполнен имено email
                    .required('Обязательное поле!'),
                amount: Yup.number() // проверка на число
                    .min(5, 'Не менее 5')
                    .required('Обязательное поле!'),
                currency: Yup.string().required('Выберите валюту!'), // провекра на строку и условие
                text: Yup.string()
                    .min(10, 'Не менее 10 символов'),
                terms: Yup.boolean() // проверка на булевое значение
                    .required('Необходимо согласие!')
                    .oneOf([true], 'Необходимо согласие!')
            })}
            onSubmit={values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Отправить пожертвование</h2>
                <MyTextInput
                    label="Ваше имя"
                    id="name"
                    name="name"
                    type="text"
                />
                <MyTextInput
                    label="Ваша почта"
                    id="email"
                    name="email"
                    type="email"
                />
                <label htmlFor="amount">Количество</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className="error" name='amount' component="div" />
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select">
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className="error" name='currency' component="div" />
                <label htmlFor="text">Ваше сообщение</label>
                <Field
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className="error" name='text' component="div" />
                <MyCheckbox
                    name="terms">
                    Соглашаетесь с политикой конфиденциальности?
                </MyCheckbox>
                <button type="submit">Отправить</button>
            </Form>
        </Formik >
    )
}

export default CustomForm;