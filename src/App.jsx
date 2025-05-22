import style from './app.module.css'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useEffect } from 'react';


const Window = ({ handleSubmit, errors, submitForm, register, isValid, submitButtonRef }) => (
  <>
    <div className={style.registrationForm}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className={style.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Введите свой адрес электронной почты"
            {...register('email')}
            className={errors.email ? style.error : ''}
          />
          {errors.email ? <p className={style.errorMessage}>{errors.email.message}</p> : <p className={style.errorMessage}></p>}
        </div>
        
        <div className={style.formGroup}>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            placeholder="Придумайте пароль"
            {...register('password')}
            className={errors.password ? style.error : ''}
          />
          {errors.password ? <p className={style.errorMessage}>{errors.password.message}</p> : <p className={style.errorMessage}></p>}
        </div>
        
        <div className={style.formGroup}>
          <label>Подтвердите пароль:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? style.error : ''}
          />
          {errors.confirmPassword ? <p className={style.errorMessage}>{errors.confirmPassword.message}</p> : <p className={style.errorMessage}></p>}
        </div>
        
        <button ref={submitButtonRef} type="submit" className={style.submitBtn} disabled={!isValid}>Зарегистрироваться</button>
      </form>
    </div>
  </>
);

const registerWindowSchema = yup.object().shape({
  email: yup.string().required('Email обязателен').email('Введите корректный email'),
  password: yup.string().required('Пароль обязателен').min(6, 'Пароль должен быть не менее 6 символов'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли должны совпадать')
})

export const App = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    resolver: yupResolver(registerWindowSchema),
  });

  const submitForm = (formData) => {
      console.log('Форма отправлена:', formData);
      reset()
  };

  const submitButtonRef = useRef(null);

  const values = watch();

  useEffect(() => {
    if (isValid && values.email && values.password && values.confirmPassword) {
      submitButtonRef.current.focus();
    }
  }, [isValid, values]);

  return (
    <>
    <Window submitForm={submitForm} handleSubmit={handleSubmit} errors={errors} isValid={isValid} register={register} submitButtonRef={submitButtonRef}/>
    </>
  );
};

