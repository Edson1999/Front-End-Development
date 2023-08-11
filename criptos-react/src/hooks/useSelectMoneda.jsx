import { useState } from 'react';
import { Label, Select } from './StyleSelectMoneda';

const useSelectMoneda = (label, opciones) => {
  const [state, setState] = useState('');

  const SelectMonedas = () => (
    <>
      <Label>{label}</Label>
      <Select value={state} onChange={(e) => setState(e.target.value)}>
        <option value="">-- Seleccione --</option>
        {opciones.map((opcion) => (
          <option key={opcion.id} value={opcion.id}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </>
  );

  return [state, SelectMonedas];
};

export default useSelectMoneda;
