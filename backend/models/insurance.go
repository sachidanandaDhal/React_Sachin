package models

type InsuranceData struct {
	ID             string `json:"id,omitempty" bson:"_id,omitempty"`
	UserID         string `json:"userId" bson:"userId"`
	Name           string `json:"name" bson:"name"`
	Mobile         string `json:"mobile" bson:"mobile"`
	Email          string `json:"email" bson:"email"`
	Date           string `json:"date" bson:"date"`
	InsuranceType  string `json:"insuranceType" bson:"insuranceType"`
	RenewalType    string `json:"renewalType" bson:"renewalType"`
	VehicleType    string `json:"vehicleType" bson:"vehicleType"`
	VehicleRegNo   string `json:"vehicleRegNo" bson:"vehicleRegNo"`
	VehicleDate    string `json:"vehicleDate" bson:"vehicleDate"`
	MakeModel      string `json:"makeModel" bson:"makeModel"`
	PremiumAmount  string `json:"premiumAmount" bson:"premiumAmount"`
	PaymentMode    string `json:"paymentMode" bson:"paymentMode"`
	AgentName      string `json:"agentName" bson:"agentName"`
	AgentContact   string `json:"agentContact" bson:"agentContact"`
	AgentEmail     string `json:"agentEmail" bson:"agentEmail"`
}
