import { useEffect, useState } from "react";
import styles from "./select.module.css";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SingleSelectProps {
  multiple?: false;
  value?: SelectOption | undefined;
  onChange: (value: SelectOption | undefined) => void;
}

interface MultipleSelectProps {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
}
// interface SelectProps {
//   options: SelectOption[];
//   value?: SelectOption | undefined;
//   onChange: (value: SelectOption | undefined) => void;
// }

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({ multiple, onChange, options, value }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  function showSelectList() {
    setIsOpen((isOpen) => !isOpen);
  }

  function clearOption(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectList(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.stopPropagation();
    setIsOpen(false);
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value?.includes(option)) {
        onChange(value.filter((item) => item !== option));
        {
          /*remove da lista se já esta salvo*/
        }
      } else {
        // salva a nova opção
        onChange([...value, option]);
      }
    } else {
      if (option === value) return;

      onChange(option);
    }
  }

  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      onClick={showSelectList}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple
          ? value.map((item) => (
              <button
                key={item.value}
                className={styles['option-badge']}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(item);
                }}
              >
                {item.label}
                <span className={styles["remove-btn"]}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
      <button onClick={(e) => clearOption(e)} className={styles["clear-btn"]}>
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              selectList(e), selectOption(option);
            }}
            key={option.value}
            onMouseEnter={() => setHighlightedIndex(index)}
            className={`${styles.option}
             ${isOptionSelected(option) ? styles.selected : ""}
             ${index === highlightedIndex ? styles.highlighted : ""}
             `}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
