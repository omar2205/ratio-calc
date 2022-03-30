<svelte:head>
  <script type="module">
		import 'https://unpkg.com/@material/mwc-textfield@0.25.3/mwc-textfield.js?module'
	</script>
</svelte:head>

<script>
	
	let blueBar = 0
	let indBar = 0
	let redBar = 0

	let totalPlayers = null
	let bluePlayers = null
	let indPlayers = null
	let redPlayers = null
	
	let blueResult = 0
	let indResult = 0
	let redResult = 0

	function IsNotNumber(i) {
		if( i >= 0 )
			return false
		if( i <= 0 )
			return false
		return true;
	}

	function calcRatio() {
		let totalRatio = bluePlayers + indPlayers + redPlayers
		let playersRatio = totalPlayers / totalRatio

		let blueCount = playersRatio * bluePlayers
		let indCount = playersRatio * indPlayers
		let redCount = playersRatio * redPlayers

		blueResult = String(Math.round(blueCount * 10) / 10)
		indResult = String(Math.round(indCount * 10) / 10)
		redResult = String(Math.round(redCount * 10) / 10)

		// 		if (IsNotNumber(blueResult) || IsNotNumber(indResult), IsNotNumber(redResult)) {
		if (isNaN(blueResult) || isNaN(indResult), isNaN(redResult)) {
			blueResult = 0
			indResult = 0
			redResult = 0
			blueBar = 0
			indBar = 0
			redBar = 0
			return
		}
		blueBar = blueCount / totalPlayers * 100
		indBar = indCount / totalPlayers * 100
		redBar = redCount / totalPlayers * 100

	}
</script>

<div class="header">
	<h3>FNF</h3>
	<h1>PVP Ratio Calculator</h1>	
</div>

<div class="card">
	<!-- Total	 -->
	<div class="layout-grid"><!-- g  -->
		<!-- 		<div class="layout-grid__inner"> -->
		<div class="layout-grid__cell layout-grid__cell--span-2">
      <mwc-textfield
        outlined
        label="Players"
        helper="Total number of players"
        on:change={e => totalPlayers = e.target.value}
        on:change={calcRatio}
      />
		</div>
		<!-- Blue -->
		<div class="layout-grid__cell">
      <mwc-textfield
        outlined
        label="BLUE"
        helper="Total number of BLUEFOR"
        on:change={e => bluePlayers = e.target.value}
        on:change={calcRatio}
      />
		</div>
		<!-- OPFOR -->
		<div class="layout-grid__cell">
      <mwc-textfield
        outlined
        label="OPFOR"
        helper="Total number of OPFOR"
        on:change={e => redPlayers = e.target.value}
        on:change={calcRatio}
      />
		</div>
		<!-- INDFOR -->
		<div class="layout-grid__cell">
      <mwc-textfield
        outlined
        label="INDFOR"
        helper="Total number of Independent"
        on:change={e => indPlayers = e.target.value}
        on:change={calcRatio}
      />
		</div>
	</div>
	
  <div class="ratio-bar">
		<div class="blue" style="width:{blueBar+'%'}"></div>
		<div class="green" style="width:{indBar+'%'}"></div>
		<div class="red" style="width:{redBar+'%'}"></div>
	</div>

	<dic class="playersCount">
		<h3>
			BLUEFOR: {blueResult} <br /> INDFOR: {indResult} <br /> OPFOR: {redResult}
		</h3>
	</dic>
</div>
<div class="footer">
	&copy; 2022 oskr.nl
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'f37 moon',  'Helvetica Now Display', 'Helvetica', sans-serif;
		background: #f4f4f4;
	}
	.header {
		text-align: center;
		padding: 12px 0 12px 0;
		background: #fff;
		border-bottom: 1px solid #0002;
	}
	.header h1, .header h3 {
		margin: 0;
	}
	.header h1 {
		font-size: 50px;
		font-weight: 200;
	}
	.card {
		background: #fff;
		margin: 2rem auto;
		padding: 2rem 1rem;
		width: 75%;
		max-width: 532px;
		border-radius: 10px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
	}

	.layout-grid {
		display: grid;
    justify-content: center;
		grid-template-columns: repeat(auto-fit, 130px);
		grid-template-rows: 100px 1.4fr 1fr;
		gap: 1px 1px;
	}
	.layout-grid__cell {
		width: 120px;
	}

	/* 	 */
	.ratio-bar {
		height: 18px;
		background: #eee;
		border-radius: 24px;
		overflow: hidden;
		display: flex;
	}
	.blue {
		background: #1976D2;
	}
	.green {
		background: #4caf50;
	}
	.red {
		background: #c62828;
	}
	.footer {
		padding: 2rem;
		text-align: center;
		font-size: 12px;
	}
</style>
