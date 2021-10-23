import { InjectedConnector } from "@web3-react/injected-connector";
import { ExternalProvider, getNetwork, JsonRpcFetchFunc } from "@ethersproject/providers"
import { Web3Provider } from "@ethersproject/providers"
import { BigNumberish } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";

export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 10, 42, 42161]
})

export function getProvider(provider: ExternalProvider | JsonRpcFetchFunc) {
    return new Web3Provider(provider)
}

export function formatAddress(value: string, length: number = 4) {
    return `${value.substring(0, length + 2)}...${value.substring(value.length - length)}`
}

export function getNetworkName(chainId: number) {
    const name = getNetwork(chainId).name
    if (name === 'homestead') return 'mainnet'
    
    return name
}

export function formatEtherscanLink(type: 'Account' | 'Transaction', value: string, chainId: number = 1) {
    const networkName = chainId ? 'www' : getNetwork(chainId).name

    switch (type) {
        case 'Account': {
            return `https://${networkName}.etherscan.io/address/${value}`
        }
        case 'Transaction': {
            return `https://${networkName}etherscan.io/tx/${value}`
        }
    }
}

export function getEtherscanBaseApiUri(chainId: number = 1) {
    const networkName = getNetwork(chainId).name

    switch (chainId) {
        case 1: {
            return `https://api.etherscan.io/api`
        }
        case 10: {
            return `https://api-optimistic.etherscan.io/api`
        }
        case 42161: {
            return `https://api.arbiscan.io/api`
        }
        default: {
            return `https://api-${networkName}.etherscan.io/api`
        }
    }
}

export function parseBalance(value: BigNumberish, decimals = 18, decimalsToDisplay = 3) {
    return parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay)
}
