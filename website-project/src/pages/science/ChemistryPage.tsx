import Accordion from 'react-bootstrap/Accordion'
import MolarMassCalculator from "../../components/chemistry/MolarMassCalculator"

function ChemistryPage() {
    return (
        <Accordion defaultActiveKey="0">
            <MolarMassCalculator />
        </Accordion>
    )
}

export default ChemistryPage