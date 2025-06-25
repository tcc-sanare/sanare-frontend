import React, { createContext, useContext, useState } from 'react';

// dados do usuário comum
interface UserData {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    saude: {
        doencas: string[]; // lista de doenças
        alergias: {
            id: string;
            description: string;
        }[];
        campos: {
            humor: boolean;
            sintomas: boolean;
            hidratacao: boolean;
            glicemia: boolean;
            pressaoArterial: boolean;
            imc: boolean;
        }
    } | null;
}

// dados do responsável
interface ResponsavelData {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    saude: {
        doencas: string[]; // lista de doenças
        alergias: {
            id: string;
            description: string;
        }[];
        campos: {
            humor: boolean;
            sintomas: boolean;
            hidratacao: boolean;
            glicemia: boolean;
            pressaoArterial: boolean;
            imc: boolean;
        }
    } | null;
}

// dados do dependente
interface DependenteData {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    saude: {
        doencas: string[]; // lista de doenças
        alergias: {
            id: string;
            description: string;
        }[];
        campos: {
            humor: boolean;
            sintomas: boolean;
            hidratacao: boolean;
            glicemia: boolean;
            pressaoArterial: boolean;
            imc: boolean;
        }
    } | null;
}

// Interface do contexto que define quais dados e funções estarão disponíveis
interface CadastroContextType {
    userData: UserData;                      // dados do usuário comum
    responsavelData: ResponsavelData;        // dados do responsável
    dependenteData: DependenteData;          // dados do dependente
    // atualiza dados de cada usuario
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
    setResponsavelData: React.Dispatch<React.SetStateAction<ResponsavelData>>;
    setDependenteData: React.Dispatch<React.SetStateAction<DependenteData>>;
    resetAll: () => void;
}

// contexto com valor padrão undefined
const CadastroContext = createContext<CadastroContextType | undefined>(undefined);

// componente Provider 
export const CadastroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // dados do usuário comum
    const [userData, setUserData] = useState<UserData>({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        saude: null
    });


    // dados do responsável
    const [responsavelData, setResponsavelData] = useState<ResponsavelData>({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        saude: null
    });

    // dados do dependente
    const [dependenteData, setDependenteData] = useState<DependenteData>({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        saude: null
    });

    // resetar todos os dados do formulário
    const resetAll = () => {
        setUserData({
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: '',
            saude: null
        });
        setResponsavelData({
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: '',
            saude: null
        });
        setDependenteData({
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: '',
            saude: null
        });
    };

    return (
        <CadastroContext.Provider value={{
            userData,
            responsavelData,
            dependenteData,
            setUserData,
            setResponsavelData,
            setDependenteData,
            resetAll
        }}>
            {children}
        </CadastroContext.Provider>
    );
};

export const useCadastro = () => {
    const context = useContext(CadastroContext);

    if (!context) {
        throw new Error('useCadastro must be used within a CadastroProvider');
    }

    return context;
};