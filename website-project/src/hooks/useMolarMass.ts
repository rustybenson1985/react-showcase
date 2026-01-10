import { useEffect, useState } from "react"

type AtomicMasses = {[key: string]: number;}
type ElementCounts = {[key: string]: number;}

const parseFormula = (formula: string): ElementCounts => {
    const elementStack: ElementCounts[] = [{}]
    const BRACKET_MAP = {'(': ')', '[': ']', '{': '}'}
    const BRACKET_OPENERS = Object.keys(BRACKET_MAP)
    const BRACKET_CLOSERS = Object.values(BRACKET_MAP)
    
    formula = formula.replaceAll(" ", "")
    const chunks = formula.split('·')

    for(let i = 0; i < chunks.length; ++i) {
        let char_index = 0
        let coefficient = 1

        const coefficient_match = chunks[i].match(/^\d+/)
        if (coefficient_match != null) {
            coefficient = Number(coefficient_match[0])
            char_index += coefficient_match[0].length
        }

        while(char_index < chunks[i].length) {
            const char = chunks[i][char_index]
            
            if (BRACKET_OPENERS.includes(char)) {
                elementStack.push({})
                char_index += 1
            } else if (BRACKET_CLOSERS.includes(char)) {
                char_index += 1
                let multiplier_match = chunks[i].slice(char_index).match(/^\d+/)
                let multiplier = 1

                if (multiplier_match != null) {
                    multiplier = Number(multiplier_match[0])
                    char_index += multiplier_match[0].length
                }

                const inner_group = elementStack.pop()
                const current_scope = elementStack[elementStack.length - 1]

                if (inner_group) {
                    for (const symbol in inner_group) {
                        const countInGroup = inner_group[symbol]
                        current_scope[symbol] = (current_scope[symbol] || 0) + (countInGroup * multiplier)
                    }
                }
            } else {
                const match = chunks[i].slice(char_index).match(/^([A-Z][a-z]?)(\d*)/)

                    if (match != null) {
                        const symbol = match[1]
                        const count = (match[2].length > 0 ? Number(match[2]) : 1) * coefficient
                        const current_scope = elementStack[elementStack.length - 1]
                        current_scope[symbol] = (current_scope[symbol] || 0) + count
                        char_index += match[0].length
                    } else {
                        char_index += 1; // Skip unrecognized characters
                    }
            }
        }
    }
    
    return elementStack[0]
}

const calculateMolarMass = (
    parsedFormula: ElementCounts, elementsData: AtomicMasses
): number => {
    let totalMass = 0.0

    for (const symbol in parsedFormula) {
        const count = parsedFormula[symbol]
        const atomicMass = elementsData[symbol] || 0

        totalMass += count * atomicMass;
    }

    return totalMass;
}

export const useMolarMass = () => {
    const [elementsData, setElementsData] = useState<ElementCounts>({})
    const [molarMass, setMolarMass] = useState<number | null>(null)
    const [userFormula, setFormula] = useState(localStorage.getItem("userFormula") || "H2O")
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        localStorage.setItem("userFormula", userFormula)
    }, [userFormula])

    useEffect(() => {
        const fetchElements = async () => {
            try {
                const response = await fetch("/elements.json")
                const json = await response.json()
                setElementsData(json)
            } catch (error) {
                console.error("Error fetching elements:", error)
            }
        }

        fetchElements()
    }, [])

    useEffect(() => {
        if (Object.keys(elementsData).length === 0) {
            return
        }

        try {
            const parsedFormula = parseFormula(userFormula)
            const newMolarMass = calculateMolarMass(parsedFormula, elementsData)
            setMolarMass(newMolarMass)
            setError(null)
        } catch (error) {
            console.error("Error calculating molar mass:", error)
            setError("Invalid Formula. Please check your input.")
            setMolarMass(null)
        }

    }, [userFormula, elementsData])

    return { userFormula, setFormula, molarMass, error }
}