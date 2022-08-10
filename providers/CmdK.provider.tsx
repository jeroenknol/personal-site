import { createContext, useContext } from 'react';
import { useActor, useMachine } from '@xstate/react';
import { cmdKMachine, CmdKService } from '../machines/cmdKMachine';

const CmdKContext = createContext<CmdKService>({} as CmdKService);

export const CmdKProvider: React.FC = ({ children }) => {
  const [_state, _send, service] = useMachine(cmdKMachine, { devTools: true });

  return (
    <CmdKContext.Provider value={service}>{children}</CmdKContext.Provider>
  );
};

export const useCmdKMachine = () => {
  const service = useContext(CmdKContext);
  return useActor(service);
};
