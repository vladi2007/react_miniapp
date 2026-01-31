import { useController } from 'react-hook-form';

function FormTextField({ name, control, placeholder }: { name: string; control: any; placeholder: string }) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <>
      <textarea placeholder={placeholder} onChange={field.onChange} onBlur={field.onBlur} value={field.value} name={field.name} />
    </>
  );
}

export default FormTextField;
