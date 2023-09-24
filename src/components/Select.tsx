import { useEffect, useState } from "react";
import styles from "./select.module.css";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: SelectOption[];
  value?: SelectOption | undefined;
  onChange: (value: SelectOption | undefined) => void;
}

export function Select({ onChange, options, value }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  function showSelectList() {
    setIsOpen((isOpen) => !isOpen);
  }

  function clearOption(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    onChange(undefined);
  }

  function selectList(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.stopPropagation();
    setIsOpen(false);
  }

  function selectOption(option: SelectOption) {
    if(option === value) return

    onChange(option);
  }

  function isOptionSelected(option: SelectOption){
    return option === value
  }

 
  useEffect(() => {
    if(isOpen) setHighlightedIndex(0)
  },[isOpen])

  return (
    <div
      onClick={showSelectList}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{value?.label}</span>
      <button onClick={(e) => clearOption(e)} className={styles["clear-btn"]}>
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              selectList(e), 
              selectOption(option);
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
