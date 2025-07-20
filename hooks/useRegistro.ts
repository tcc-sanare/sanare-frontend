import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useUser } from "@/contexts/UserContext";

type RegistroType = {
    humor?: {
        date: string;
        moods: string[];
    }
    hidratacao?: {
        date: string;
        litros: string;
    };
    pressao?: {
        date: string;
        sistolica: string;
        diastolica: string;
    };
    glicemia?: {
        date: string;
        valor: string;
        horario: string;
        situacao: string;
    };
    imc?: {
        date: string;
        altura: string;
        peso: string;
        valor: string;
    }
    sintomas?: {
        date: string;
        symptoms: string[];
    }
};

export const useRegistro = () => {
    const [registros, setRegistros] = useState<RegistroType>({});
    const { user } = useUser();

    const getStorageKey = () => {
        return user ? `@registros_${user.id}` : '@registros';
    }

    useEffect(() => {
        loadRegistros();
    }, [user]);

    const loadRegistros = async () => {
        try {
            const saved = await AsyncStorage.getItem(getStorageKey());
            if (saved) {
                setRegistros(JSON.parse(saved));
            }
        } catch (e) {
            console.error('Erro ao carregar registros', e);
        }
    };

    const updateRegistro = async (type: keyof RegistroType, value: any) => {
        try {
            const currentData = await AsyncStorage.getItem(getStorageKey());
            const registrosAtuais = currentData ? JSON.parse(currentData) : {};

            const novosRegistros = { ...registrosAtuais, [type]: value };

            await AsyncStorage.setItem(getStorageKey(), JSON.stringify(novosRegistros));
            setRegistros(novosRegistros);

            return true;
        } catch (e) {
            console.error('Erro ao atualizar registro', e);
            return false;
        }
    };

    return { registros, loadRegistros, updateRegistro };
};