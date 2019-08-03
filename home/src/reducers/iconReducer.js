import {} from '../actions/types';
import { FontAwesome } from './../components/common/icons/FontAwesome';
import { Feather } from './../components/common/icons/Feather';
import { AntDesignIcon } from './../components/common/icons/AntDesignIcon';
import { EntypoIcon } from './../components/common/icons/EntypoIcon';
import { Evillcons } from './../components/common/icons/EvilIcons';
import { Foundation } from './../components/common/icons/Foundation';
import { Ionicons } from './../components/common/icons/Ionicons';
import { MaterialCommunityIcons } from './../components/common/icons/MaterialCommunityIcons';
import { MaterialIcons } from './../components/common/icons/MaterialIcons';
import { Octicons } from './../components/common/icons/Octicons';
import { SimpleLineIcons } from './../components/common/icons/SimpleLineIcons';
import { Zocial } from './../components/common/icons/Zocial';
import { AllIcons } from './../components/common/icons/AllIcons';
const initialState = {
	/*IconsFeather: Feather,
	IconsfontAwsome: FontAwesome,
	IconsAntDesign: AntDesignIcon,
	IconsEntypoIcon: EntypoIcon,
	IconsEvillcons: Evillcons,
	IconsFoundation: Foundation,
	IconsIonicons: Ionicons,
	IconsMaterialCommunityIcons: MaterialCommunityIcons,
	IconsMaterialIcons: MaterialIcons,
	IconsOcticons: Octicons,
	IconsSimpleLineIcons: SimpleLineIcons,
	IconsZocial: Zocial,*/
	allIcons: AllIcons
};

export default function(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}
