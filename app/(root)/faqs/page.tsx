import { Showcase } from "../_components/Showcase";
import { FAQs } from "../_components/FAQs";
import { HelpForm } from "./_components/HelpForm";

const page = () => {
	return (
		<div>
			<Showcase
				title="Frequency asked question"
				description="Have questions? We’ve got answers. Browse through our most commonly asked questions to get quick help on how the platform works—from signing up and completing tasks to earning rewards and getting paid."
				image={"/assets/images/faq-img.jpg"}
			/>
			<FAQs showTitle={false} />
			<HelpForm />
		</div>
	);
};

export default page;
