import styles from './ChoiceGroup.module.scss';

export interface ChoiceOption<T extends string> {
  value: T;
  label: string;
}

interface ChoiceGroupProps<T extends string> {
  name: string;
  legend: string;
  options: readonly ChoiceOption<T>[];
  value: T | '';
  onChange: (value: T) => void;
  errors?: string[];
}

function ChoiceItem<T extends string>({ name, option, checked, onChange }: {
  name: string;
  option: ChoiceOption<T>;
  checked: boolean;
  onChange: (value: T) => void;
}) {
  return (
    <label className={`${styles.choice__option} ${checked ? styles['choice__option--checked'] : ''}`}>
      <input
        className="sr-only"
        type="radio"
        name={name}
        value={option.value}
        checked={checked}
        onChange={() => onChange(option.value)}
      />
      {option.label}
    </label>
  );
}

// 버튼처럼 생긴 라디오 묶음 (신랑측/신부측 · 참석/불참 · 식사 여부)
export default function ChoiceGroup<T extends string>({ name, legend, options, value, onChange, errors }: ChoiceGroupProps<T>) {
  return (
    <fieldset className={`${styles.choice} ${errors?.length ? styles['choice--invalid'] : ''}`}>
      <legend className={styles.choice__legend}>{legend}</legend>
      <div className={styles.choice__options}>
        {options.map((option) => (
          <ChoiceItem key={option.value} name={name} option={option} checked={value === option.value} onChange={onChange} />
        ))}
      </div>
      {errors?.map((error) => (
        <p key={error} className={styles.choice__error} role="alert">
          {error}
        </p>
      ))}
    </fieldset>
  );
}
