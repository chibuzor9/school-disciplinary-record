import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<div className="flex h-screen bg-customWhite">
			<div className="w-1/2 bg-gray-100 flex items-center justify-center m-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					data-name="Layer 1"
					width="929.01319"
					height="743.5"
					viewBox="0 0 929.01319 743.5"
					// eslint-disable-next-line react/no-unknown-property
					xmlns:xlink="http://www.w3.org/1999/xlink"
				>
					<path
						d="M1064.48912,770.84388a381.14587,381.14587,0,0,1-3.59319,48.97513c-.07869.57-.16443,1.14-.24346,1.70993l-153.4479-.85739c-.45054-.56608-.894-1.139-1.32365-1.71869-1.43261-1.91858-2.77531-3.8917-4.0079-5.93286-5.92441-9.83353-8.63666-21.34664-5.91871-29.29l.04867-.12343a13.93866,13.93866,0,0,1,2.72045-4.727c6.19685-6.9755,18.72625-5.81272,30.09644-.18234-10.1983-11.16319-18.3188-25.24941-18.93582-37.823-.605-12.26419,5.8079-21.02536,12.76344-28.47084.22823-.24613.45642-.48542.68461-.72467.11075-.12309.22819-.2393.33861-.36238,5.42681-5.674,11.75353-11.26734,20.91106-10.59074,10.04343.74338,21.1786,9.15586,28.98611,18.95868,7.80756,9.79593,12.99585,20.92425,18.25477,31.785,5.26567,10.85387,10.96268,21.98507,19.41241,31.26226-11.44458-14.4759-20.67193-30.94626-24.0805-46.96489s-.40878-31.40348,9.791-38.94766a23.85656,23.85656,0,0,1,10.44967-4.21639c.44-.07313.887-.1325,1.341-.185,9.44215-1.07433,20.71581,2.19131,30.30769,9.99725,10.56333,8.5949,17.887,21.33649,21.53088,33.43212C1064.21842,747.94265,1064.60672,759.58711,1064.48912,770.84388Z"
						transform="translate(-135.4934 -78.25)"
						fill="#f2f2f2"
					/>
					<path
						d="M964.09456,820.98942l-2.93421-.0164q-1.3975-.87372-2.80821-1.727c-.58219-.36749-1.17117-.72129-1.76045-1.082q-14.59921-8.91639-29.381-17.1053-14.76835-8.1957-29.68522-15.6362a1.22975,1.22975,0,0,1-.70693-1.406.3543.3543,0,0,1,.0489-.10279c.1387-.26039.44871-.36865.90117-.14619,1.21977.61162,2.44659,1.22327,3.66628,1.84864q14.95761,7.56786,29.78683,15.89109,14.819,8.31967,29.46913,17.3738c.20535.12485.411.25658.61634.38143C962.23853,819.83821,963.16319,820.41381,964.09456,820.98942Z"
						transform="translate(-135.4934 -78.25)"
						fill="#fff"
					/>
					<path
						d="M1001.92759,821.20081l-1.81442-.01014c-.40922-.57268-.8114-1.14537-1.22063-1.7181q-14.42228-20.22435-28.83852-40.44869-23.60823-33.11038-47.20238-66.22068a1.16867,1.16867,0,0,1-.20415-.39977c-.13452-.48872.22448-.77536.68461-.72467a1.37834,1.37834,0,0,1,.95869.61015q13.236,18.56831,26.46543,37.1228,23.48533,32.94479,46.964,65.88259c.99559,1.39386,1.99115,2.79455,2.98674,4.1884C1001.11619,820.05543,1001.52541,820.62816,1001.92759,821.20081Z"
						transform="translate(-135.4934 -78.25)"
						fill="#fff"
					/>
					<path
						d="M1042.34961,810.6641c-.09259,3.05782-.295,6.06692-.55929,9.04816q-.07677.85523-.15386,1.71042l-1.90368-.01063c.05822-.57008.11644-1.1402.16761-1.71035.40226-4.30693.68768-8.66258.72644-13.13647a183.261,183.261,0,0,0-3.60779-36.94009,230,230,0,0,0-11.17379-38.37754,263.55654,263.55654,0,0,0-18.282-37.97055,1.01423,1.01423,0,0,1-.168-.67445c.07854-.54253.80094-.70343,1.341-.185a1.57576,1.57576,0,0,1,.27291.34516q1.31724,2.265,2.58642,4.54355a263.37383,263.37383,0,0,1,17.498,38.1036,228.91263,228.91263,0,0,1,10.41707,38.43518A180.79932,180.79932,0,0,1,1042.34961,810.6641Z"
						transform="translate(-135.4934 -78.25)"
						fill="#fff"
					/>
					<path
						d="M764.44156,794.59948a199.18081,199.18081,0,0,1-1.87772,25.59327c-.04113.29787-.08593.59572-.12723.89356l-80.18832-.44805c-.23545-.29582-.46718-.59519-.69171-.89814-.74865-1.00261-1.45032-2.03371-2.09444-3.10038-3.096-5.13878-4.51332-11.15526-3.093-15.30628l.02544-.0645a7.28369,7.28369,0,0,1,1.42164-2.4702c3.23833-3.64524,9.78591-3.03759,15.7277-.09529-5.32939-5.83363-9.573-13.19476-9.89542-19.76542-.31615-6.409,3.03508-10.98737,6.66988-14.8782.11927-.12862.23851-.25367.35776-.3787.05788-.06432.11924-.125.177-.18937,2.83593-2.96509,6.14212-5.888,10.92764-5.53448,5.24846.38848,11.06744,4.78465,15.14747,9.90737,4.08005,5.11913,6.79133,10.93453,9.53952,16.61009,2.75171,5.672,5.72884,11.48889,10.14448,16.33693-5.98068-7.56477-10.80268-16.1718-12.58392-24.54276s-.21362-16.41074,5.11656-20.35315a12.46691,12.46691,0,0,1,5.46076-2.20339c.22994-.03821.46353-.06924.70078-.09665,4.93425-.56142,10.82561,1.14512,15.8381,5.22433A36.46069,36.46069,0,0,1,762.396,776.31092C764.30009,782.63182,764.503,788.717,764.44156,794.59948Z"
						transform="translate(-135.4934 -78.25)"
						fill="#f2f2f2"
					/>
					<path
						d="M711.97768,820.80438l-1.53335-.00857q-.73031-.4566-1.46751-.90248c-.30424-.192-.612-.37693-.92-.56541q-7.62921-4.65951-15.35385-8.93884-7.71759-4.28288-15.51281-8.17111a.64266.64266,0,0,1-.36943-.73475.18545.18545,0,0,1,.02556-.05371c.07248-.13608.23449-.19265.47093-.0764.63742.31962,1.27853.63926,1.91591.96606q7.8165,3.95478,15.56591,8.30432,7.74406,4.34767,15.39989,9.07914c.10731.06524.21478.13408.32209.19933C711.00776,820.20278,711.491,820.50358,711.97768,820.80438Z"
						transform="translate(-135.4934 -78.25)"
						fill="#fff"
					/>
					<path
						d="M731.74835,820.91484l-.94818-.00529c-.21385-.29928-.424-.59855-.63787-.89785q-7.53675-10.56876-15.07034-21.13755-12.33713-17.30271-24.66688-34.60539a.61082.61082,0,0,1-.10668-.20891c-.0703-.2554.1173-.40519.35776-.3787a.7203.7203,0,0,1,.501.31885q6.91684,9.70337,13.83022,19.39952,12.27289,17.21617,24.5423,34.42872c.52028.7284,1.04053,1.46037,1.5608,2.18876C731.32433,820.3163,731.53818,820.61559,731.74835,820.91484Z"
						transform="translate(-135.4934 -78.25)"
						fill="#fff"
					/>
					<path
						d="M752.872,815.4086c-.04839,1.59795-.15415,3.17044-.29227,4.72836q-.04012.44692-.08041.89383l-.99482-.00556c.03043-.29791.06085-.59584.0876-.89379.21021-2.2507.35936-4.52686.37961-6.86481a95.76776,95.76776,0,0,0-1.88534-19.304,120.19314,120.19314,0,0,0-5.83917-20.05521,137.72821,137.72821,0,0,0-9.55372-19.84254.53.53,0,0,1-.08782-.35245c.041-.28351.41855-.36759.70078-.09665a.82368.82368,0,0,1,.14262.18037q.68835,1.18365,1.3516,2.37435a137.63277,137.63277,0,0,1,9.144,19.91206,119.623,119.623,0,0,1,5.44372,20.08534A94.48078,94.48078,0,0,1,752.872,815.4086Z"
						transform="translate(-135.4934 -78.25)"
						fill="#fff"
					/>
					<path
						d="M301.44665,482.57373H151.16577a15.69025,15.69025,0,0,1-15.67237-15.67236V286.38672a15.69025,15.69025,0,0,1,15.67237-15.67236H301.44665A15.69025,15.69025,0,0,1,317.119,286.38672V466.90137A15.69025,15.69025,0,0,1,301.44665,482.57373ZM151.16577,272.71436a13.68781,13.68781,0,0,0-13.67237,13.67236V466.90137a13.68781,13.68781,0,0,0,13.67237,13.67236H301.44665A13.6878,13.6878,0,0,0,315.119,466.90137V286.38672a13.6878,13.6878,0,0,0-13.67236-13.67236Z"
						transform="translate(-135.4934 -78.25)"
						fill="#3f3d56"
					/>
					<path
						d="M261.43566,285.55273H191.17675a12.51409,12.51409,0,0,1-12.5-12.5v-2.67724a12.51409,12.51409,0,0,1,12.5-12.5h70.25891a12.51408,12.51408,0,0,1,12.5,12.5v2.67724A12.51408,12.51408,0,0,1,261.43566,285.55273Z"
						transform="translate(-135.4934 -78.25)"
						fill="#ccc"
					/>
					<path
						d="M295.222,383.75793H157.39051a7.11389,7.11389,0,1,1,0-14.22777H295.222a7.11389,7.11389,0,0,1,0,14.22777Z"
						transform="translate(-135.4934 -78.25)"
						fill="#6c63ff"
					/>
					<path
						d="M295.222,413.99194H157.39051a7.11389,7.11389,0,1,1,0-14.22777H295.222a7.11389,7.11389,0,0,1,0,14.22777Z"
						transform="translate(-135.4934 -78.25)"
						fill="#6c63ff"
					/>
					<path
						d="M258.31874,353.52392h-64.025a7.11389,7.11389,0,1,1,0-14.22777h64.025a7.11389,7.11389,0,1,1,0,14.22777Z"
						transform="translate(-135.4934 -78.25)"
						fill="#6c63ff"
					/>
					<path
						d="M620.68212,302.94824H470.40136A15.69017,15.69017,0,0,1,454.729,287.27588V106.76074a15.69017,15.69017,0,0,1,15.67236-15.67236H620.68212a15.69017,15.69017,0,0,1,15.67237,15.67236V287.27588A15.69017,15.69017,0,0,1,620.68212,302.94824ZM470.40136,93.08838A13.68772,13.68772,0,0,0,456.729,106.76074V287.27588a13.68772,13.68772,0,0,0,13.67236,13.67236H620.68212a13.68772,13.68772,0,0,0,13.67237-13.67236V106.76074a13.68772,13.68772,0,0,0-13.67237-13.67236Z"
						transform="translate(-135.4934 -78.25)"
						fill="#3f3d56"
					/>
					<path
						d="M580.67114,105.92725H510.41235a12.51409,12.51409,0,0,1-12.5-12.5V90.75a12.51408,12.51408,0,0,1,12.5-12.5h70.25879a12.51408,12.51408,0,0,1,12.5,12.5v2.67725A12.51409,12.51409,0,0,1,580.67114,105.92725Z"
						transform="translate(-135.4934 -78.25)"
						fill="#ccc"
					/>
					<path
						d="M614.45755,204.1322H476.626a7.11389,7.11389,0,1,1,0-14.22777H614.45755a7.11389,7.11389,0,1,1,0,14.22777Z"
						transform="translate(-135.4934 -78.25)"
						fill="#6c63ff"
					/>
					<path
						d="M614.45755,234.3662H476.626a7.11388,7.11388,0,1,1,0-14.22776H614.45755a7.11388,7.11388,0,1,1,0,14.22776Z"
						transform="translate(-135.4934 -78.25)"
						fill="#6c63ff"
					/>
					<path
						d="M577.55428,173.89819h-64.025a7.11389,7.11389,0,1,1,0-14.22777h64.025a7.11388,7.11388,0,0,1,0,14.22777Z"
						transform="translate(-135.4934 -78.25)"
						fill="#6c63ff"
					/>
					<path
						d="M927.28285,607.09434l-131.95713,71.914a15.69017,15.69017,0,0,1-21.26115-6.26173L687.68271,514.242a15.69017,15.69017,0,0,1,6.26173-21.26116l131.95712-71.914a15.69017,15.69017,0,0,1,21.26115,6.26173l86.38187,158.50462A15.69017,15.69017,0,0,1,927.28285,607.09434ZM694.9015,494.737a13.68772,13.68772,0,0,0-5.46265,18.548l86.38186,158.50462a13.68773,13.68773,0,0,0,18.548,5.46265l131.95712-71.914a13.68772,13.68772,0,0,0,5.46265-18.548L845.40657,428.28563a13.68773,13.68773,0,0,0-18.548-5.46265Z"
						transform="translate(-135.4934 -78.25)"
						fill="#3f3d56"
					/>
					<path
						d="M797.86971,453.24249l-61.69218,33.621A12.51409,12.51409,0,0,1,719.22,481.86925l-1.28114-2.35081a12.51408,12.51408,0,0,1,4.99424-16.95752l61.69218-33.621a12.51409,12.51409,0,0,1,16.95752,4.99424L802.864,436.285A12.51409,12.51409,0,0,1,797.86971,453.24249Z"
						transform="translate(-135.4934 -78.25)"
						fill="#ccc"
					/>
					<path
						d="M874.53081,523.30573,753.505,589.26239a7.11389,7.11389,0,1,1-6.80843-12.493l121.02581-65.95665a7.11388,7.11388,0,0,1,6.80843,12.493Z"
						transform="translate(-135.4934 -78.25)"
						fill="#ccc"
					/>
					<path
						d="M888.99872,549.85333,767.97291,615.81a7.11389,7.11389,0,1,1-6.80843-12.493l121.02581-65.95666a7.11389,7.11389,0,0,1,6.80843,12.493Z"
						transform="translate(-135.4934 -78.25)"
						fill="#ccc"
					/>
					<path
						d="M827.65921,514.4175l-56.21844,30.63793a7.11388,7.11388,0,1,1-6.80843-12.493l56.21844-30.63794a7.11389,7.11389,0,1,1,6.80843,12.493Z"
						transform="translate(-135.4934 -78.25)"
						fill="#ccc"
					/>
					<rect
						x="339.42147"
						y="261.99445"
						width="81.27668"
						height="1.99987"
						transform="translate(-216.16282 148.13716) rotate(-30.13963)"
						fill="#3f3d56"
					/>
					<polygon
						points="282.194 174.428 292.122 157.132 272.179 157.179 282.194 174.428"
						fill="#3f3d56"
					/>
					<path
						d="M622.72607,510.19189a.995.995,0,0,1-.4563-.11035L352.121,371.30908a1.00012,1.00012,0,0,1,.91382-1.77929l270.149,138.77246a1.00011,1.00011,0,0,1-.45776,1.88964Z"
						transform="translate(-135.4934 -78.25)"
						fill="#3f3d56"
					/>
					<polygon
						points="480.081 438.479 500 437.5 489.195 420.738 480.081 438.479"
						fill="#3f3d56"
					/>
					<path
						d="M901.46719,624.93206a10.74269,10.74269,0,0,1-3.84155-16.01842l-8.033-78.54h17.36007l6.384,76.69031a10.80091,10.80091,0,0,1-11.86954,17.86816Z"
						transform="translate(-135.4934 -78.25)"
						fill="#a0616a"
					/>
					<circle
						cx="750.03414"
						cy="384.21807"
						r="24.56103"
						fill="#a0616a"
					/>
					<path
						d="M879.93858,576.00835l-36.65649-8.00488a4.511,4.511,0,0,1-3.53394-4.165c-.42334-8.17969-.72754-29.33984,5.57324-49.09375A29.74834,29.74834,0,0,1,883.5482,495.794h0a29.76178,29.76178,0,0,1,16.90088,41.09033c-8.12891,16.69238-13.24854,28.78027-15.21631,35.92969a4.49237,4.49237,0,0,1-5.29419,3.19433Z"
						transform="translate(-135.4934 -78.25)"
						fill="#6c63ff"
					/>
					<polygon
						points="709.913 731.092 697.653 731.091 691.821 683.803 709.915 683.804 709.913 731.092"
						fill="#a0616a"
					/>
					<path
						d="M688.89581,727.58795h23.64385a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H674.00894a0,0,0,0,1,0,0v0A14.88687,14.88687,0,0,1,688.89581,727.58795Z"
						fill="#2f2e41"
					/>
					<polygon
						points="832.504 715.203 821.761 721.109 793.866 682.482 809.722 673.764 832.504 715.203"
						fill="#a0616a"
					/>
					<path
						d="M950.93729,797.47815h23.64387a0,0,0,0,1,0,0V812.365a0,0,0,0,1,0,0H936.05043a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,950.93729,797.47815Z"
						transform="translate(-405.10525 481.5608) rotate(-28.80096)"
						fill="#2f2e41"
					/>
					<path
						d="M845.6295,783.08159,826.756,781.62847a4.48766,4.48766,0,0,1-4.134-4.04981c-2.6897-28.05566-14.49072-170.22754,17.42676-214l.08935-.12207.14258-.05273c.28565-.10449,28.75049-10.25488,45.08179,8.34668a4.49768,4.49768,0,0,1,.866,4.37695l-.62305,1.86914a3.48476,3.48476,0,0,0,.49585,3.17285c4.53223,6.127,19.78638,29.72461,25.78174,76.12793a3.466,3.466,0,0,0,.22607.86133L956.37315,766.896a4.49961,4.49961,0,0,1-2.56592,5.90136l-13.928,5.30664a4.52455,4.52455,0,0,1-5.54273-2.03418L870.43785,660.13921a2.5,2.5,0,0,0-4.66846.88574L850.43712,779.17339a4.49948,4.49948,0,0,1-4.45826,3.9209C845.86314,783.09429,845.74669,783.09038,845.6295,783.08159Z"
						transform="translate(-135.4934 -78.25)"
						fill="#2f2e41"
					/>
					<path
						d="M790.04351,490.99829a10.527,10.527,0,0,1,.2393,1.64013l42.95745,24.782,10.44141-6.01094,11.13116,14.57228-17.45034,12.43754a8,8,0,0,1-9.59819-.23383l-44.29652-34.94584a10.4971,10.4971,0,1,1,6.57573-12.24132Z"
						transform="translate(-135.4934 -78.25)"
						fill="#a0616a"
					/>
					<path
						d="M833.83049,514.94326a4.49516,4.49516,0,0,1,2.21126-3.025l19.713-11.02279a12.49742,12.49742,0,0,1,15.32664,19.74414L855.364,536.96079a4.5,4.5,0,0,1-6.80392-.37267l-13.88374-17.994A4.495,4.495,0,0,1,833.83049,514.94326Z"
						transform="translate(-135.4934 -78.25)"
						fill="#6c63ff"
					/>
					<path
						d="M884.8575,548.92609a4.49517,4.49517,0,0,1-1.667-3.35581l-.7074-22.57438a12.49742,12.49742,0,0,1,24.58385-4.51347l7.25055,21.46732a4.5,4.5,0,0,1-3.46382,5.86807l-22.36585,4.03854A4.49491,4.49491,0,0,1,884.8575,548.92609Z"
						transform="translate(-135.4934 -78.25)"
						fill="#6c63ff"
					/>
					<path
						d="M881.64013,456.81874c-6.31271,4.32051-14.60145,8.76174-21.04891,4.16075-4.23352-3.02109-5.56737-8.61546-3.8506-13.52487,3.08726-8.82857,11.56943-12.71531,19.68052-15.69459,10.54441-3.873,22.02573-6.95424,32.91112-4.18054s20.5056,13.31291,18.54058,24.37292c-1.58022,8.89423-9.97,16.29492-8.779,25.24958,1.19867,9.01215,11.33379,13.7559,20.28149,15.36659s18.96038,2.12821,25.39074,8.5552c8.2031,8.19879,6.15465,22.85324-1.56414,31.50954s-19.36683,12.58012-30.6538,15.24758c-14.95454,3.53422-31.12905,5.3916-45.33209-.47379s-25.25565-21.65433-21.14126-36.45976c1.73791-6.25379,5.83191-11.53909,9.78854-16.68451s7.9631-10.526,9.47237-16.83888c1.25773-5.26073.32683-11.36869-3.16181-15.31484a4.437,4.437,0,0,1-.5944-5.18643Z"
						transform="translate(-135.4934 -78.25)"
						fill="#2f2e41"
					/>
					<path
						d="M1061.80443,821.75h-381a1,1,0,0,1,0-2h381a1,1,0,0,1,0,2Z"
						transform="translate(-135.4934 -78.25)"
						fill="#3f3d56"
					/>
				</svg>
			</div>

			<div className="w-1/2 bg-white flex items-center justify-center">
				<div className="bg-white p-8 rounded-lg shadow-lg text-center h-2/5 w-3/5">
					<h2 className="text-3xl font-semibold mb-6 text-left">
						Who are you?
					</h2>
					<div className="space-y-12 mt-12">
						<div className="group relative flex items-center">
							<button
								className="w-full h-16 px-4 py-2 bg-customBlue text-white border border-customPurple rounded-lg hover:bg-customPurple hover:border-customBlue transition-colors duration-300"
								onClick={() =>
									navigate('/login')
								}
							>
								Admin
							</button>
							<span className="hidden group-hover:inline-block absolute right-3 top-1/2 -translate-y-1/2 transform transition-transform animate-bounce">
								→
							</span>
						</div>
						<div className="group relative flex items-center">
							<button
								className="w-full px-4 py-2 h-16 bg-customBlue text-white border border-customPurple rounded-lg hover:bg-customPurple hover:border-customBlue transition-colors duration-300"
								onClick={() =>
									navigate('/login')
								}
							>
								Student
							</button>
							<span className="hidden group-hover:inline-block absolute right-3 top-1/2 -translate-y-1/2 transform transition-transform animate-bounce">
								→
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
